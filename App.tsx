
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from '@google/genai';
import React, {useCallback, useEffect, useState} from 'react';
import ApiKeyDialog from './components/ApiKeyDialog';
import {CurvedArrowDownIcon} from './components/icons';
import LoadingIndicator from './components/LoadingIndicator';
import PromptForm from './components/PromptForm';
import VideoResult from './components/VideoResult';
import ProjectContent from './components/ProjectContent';
import {generateVideo} from './services/geminiService';
import {
  AppState,
  GenerateVideoParams,
  GenerationMode,
  Resolution,
  VideoFile,
  ViewType,
} from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HISTORY);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastConfig, setLastConfig] = useState<GenerateVideoParams | null>(
    null,
  );
  const [lastVideoObject, setLastVideoObject] = useState<Video | null>(null);
  const [lastVideoBlob, setLastVideoBlob] = useState<Blob | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState<GenerateVideoParams | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        try {
          if (!(await window.aistudio.hasSelectedApiKey())) {
            setShowApiKeyDialog(true);
          }
        } catch (error) {
          setShowApiKeyDialog(true);
        }
      }
    };
    checkApiKey();
  }, []);

  const handleGenerate = useCallback(async (params: GenerateVideoParams) => {
    if (window.aistudio) {
      try {
        if (!(await window.aistudio.hasSelectedApiKey())) {
          setShowApiKeyDialog(true);
          return;
        }
      } catch (error) {
        setShowApiKeyDialog(true);
        return;
      }
    }

    setAppState(AppState.LOADING);
    setErrorMessage(null);
    setLastConfig(params);
    setInitialFormValues(null);

    try {
      const {objectUrl, blob, video} = await generateVideo(params);
      setVideoUrl(objectUrl);
      setLastVideoBlob(blob);
      setLastVideoObject(video);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error('Video generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(`Video generation failed: ${errorMessage}`);
      setAppState(AppState.ERROR);
      if (errorMessage.includes('entity was not found') || errorMessage.includes('API_KEY_INVALID')) {
        setShowApiKeyDialog(true);
      }
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastConfig) handleGenerate(lastConfig);
  }, [lastConfig, handleGenerate]);

  const handleApiKeyDialogContinue = async () => {
    setShowApiKeyDialog(false);
    if (window.aistudio) await window.aistudio.openSelectKey();
    if (appState === AppState.ERROR && lastConfig) handleRetry();
  };

  const handleNewVideo = useCallback(() => {
    setAppState(AppState.IDLE);
    setVideoUrl(null);
    setErrorMessage(null);
    setLastConfig(null);
    setLastVideoObject(null);
    setLastVideoBlob(null);
    setInitialFormValues(null);
  }, []);

  const handleExtend = useCallback(async () => {
    if (lastConfig && lastVideoBlob && lastVideoObject) {
      const file = new File([lastVideoBlob], 'last_video.mp4', { type: lastVideoBlob.type });
      setInitialFormValues({
        ...lastConfig,
        mode: GenerationMode.EXTEND_VIDEO,
        prompt: '',
        inputVideo: {file, base64: ''},
        inputVideoObject: lastVideoObject,
        resolution: Resolution.P720,
        startFrame: null,
        endFrame: null,
        referenceImages: [],
        styleImage: null,
        isLooping: false,
      });
      setAppState(AppState.IDLE);
      setVideoUrl(null);
    }
  }, [lastConfig, lastVideoBlob, lastVideoObject]);

  return (
    <div className="h-screen bg-[#0a0a0c] text-gray-200 flex flex-col font-sans overflow-hidden">
      {showApiKeyDialog && <ApiKeyDialog onContinue={handleApiKeyDialogContinue} />}
      
      <header className="py-4 border-b border-gray-800 flex justify-between items-center px-8 relative z-10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/20">A</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase italic">Atelier IR 4.0+</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Spatial Intelligence Portal</p>
          </div>
        </div>
        
        <nav className="flex gap-1 bg-gray-900/80 p-1 rounded-xl border border-gray-800">
          {Object.values(ViewType).map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all font-bold tracking-tighter uppercase ${
                currentView === view 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-gray-500 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {view}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-grow flex flex-col overflow-y-auto custom-scrollbar">
        {currentView === ViewType.STUDIO ? (
          <div className="w-full max-w-4xl mx-auto flex-grow flex flex-col p-8">
             {appState === AppState.IDLE ? (
              <div className="flex flex-col flex-grow">
                <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                  <h2 className="text-4xl font-bold text-white mb-2">Simulation Lab</h2>
                  <p className="text-gray-400 max-w-lg mb-8">
                    Simulate the Neuro-Generative environment using Veo's advanced cinematic engine.
                  </p>
                  <div className="relative">
                    <CurvedArrowDownIcon className="w-16 h-16 text-indigo-500/40 animate-pulse" />
                  </div>
                </div>
                <div className="pb-8">
                  <PromptForm onGenerate={handleGenerate} initialValues={initialFormValues} />
                </div>
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center py-8">
                {appState === AppState.LOADING && <LoadingIndicator />}
                {appState === AppState.SUCCESS && videoUrl && (
                  <VideoResult
                    videoUrl={videoUrl}
                    onRetry={handleRetry}
                    onNewVideo={handleNewVideo}
                    onExtend={handleExtend}
                    canExtend={lastConfig?.resolution === Resolution.P720}
                  />
                )}
                {appState === AppState.ERROR && errorMessage && (
                  <div className="text-center bg-red-900/10 border border-red-500/50 p-12 rounded-2xl max-w-lg">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Simulation Failed</h2>
                    <p className="text-red-300/80 mb-8">{errorMessage}</p>
                    <button onClick={handleNewVideo} className="px-8 py-3 bg-red-600 rounded-xl hover:bg-red-500 transition-colors font-bold">Reset Core</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <ProjectContent view={currentView} />
        )}
      </main>
    </div>
  );
};

export default App;

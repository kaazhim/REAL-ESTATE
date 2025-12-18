
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from '@google/genai';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AspectRatio,
  GenerateVideoParams,
  GenerationMode,
  ImageFile,
  Resolution,
  VeoModel,
  VideoFile,
} from '../types';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  FilmIcon,
  FramesModeIcon,
  PlusIcon,
  RectangleStackIcon,
  ReferencesModeIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  TextModeIcon,
  TvIcon,
  XMarkIcon,
} from './icons';

const aspectRatioDisplayNames: Record<AspectRatio, string> = {
  [AspectRatio.LANDSCAPE]: 'Landscape (16:9)',
  [AspectRatio.PORTRAIT]: 'Portrait (9:16)',
};

const modeIcons: Record<GenerationMode, React.ReactNode> = {
  [GenerationMode.TEXT_TO_VIDEO]: <TextModeIcon className="w-5 h-5" />,
  [GenerationMode.FRAMES_TO_VIDEO]: <FramesModeIcon className="w-5 h-5" />,
  [GenerationMode.REFERENCES_TO_VIDEO]: (
    <ReferencesModeIcon className="w-5 h-5" />
  ),
  [GenerationMode.EXTEND_VIDEO]: <FilmIcon className="w-5 h-5" />,
};

const fileToBase64 = <T extends {file: File; base64: string}>(
  file: File,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      if (base64) {
        resolve({file, base64} as T);
      } else {
        reject(new Error('Failed to read file as base64.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
const fileToImageFile = (file: File): Promise<ImageFile> =>
  fileToBase64<ImageFile>(file);
const fileToVideoFile = (file: File): Promise<VideoFile> =>
  fileToBase64<VideoFile>(file);

const CustomSelect: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({label, value, onChange, icon, children, disabled = false}) => (
  <div>
    <label
      className={`text-xs block mb-1.5 font-medium ${
        disabled ? 'text-gray-500' : 'text-gray-400'
      }`}>
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </div>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg pl-10 pr-8 py-2.5 appearance-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-700/50 disabled:border-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed">
        {children}
      </select>
      <ChevronDownIcon
        className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
          disabled ? 'text-gray-600' : 'text-gray-400'
        }`}
      />
    </div>
  </div>
);

const ImageUpload: React.FC<{
  onSelect: (image: ImageFile) => void;
  onRemove?: () => void;
  image?: ImageFile | null;
  label: React.ReactNode;
}> = ({onSelect, onRemove, image, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageFile = await fileToImageFile(file);
        onSelect(imageFile);
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  if (image) {
    return (
      <div className="relative w-28 h-20 group">
        <img src={URL.createObjectURL(image.file)} alt="preview" className="w-full h-full object-cover rounded-lg" />
        <button type="button" onClick={onRemove} className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => inputRef.current?.click()} className="w-28 h-20 bg-gray-700/50 hover:bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors">
      <PlusIcon className="w-6 h-6" />
      <span className="text-[10px] mt-1 text-center px-1">{label}</span>
      <input type="file" ref={inputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </button>
  );
};

const VideoUpload: React.FC<{
  onSelect: (video: VideoFile) => void;
  onRemove?: () => void;
  video?: VideoFile | null;
  label: React.ReactNode;
}> = ({onSelect, onRemove, video, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const videoFile = await fileToVideoFile(file);
        onSelect(videoFile);
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
  };

  if (video) {
    return (
      <div className="relative w-48 h-28 group">
        <video src={URL.createObjectURL(video.file)} muted loop className="w-full h-full object-cover rounded-lg" />
        <button type="button" onClick={onRemove} className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => inputRef.current?.click()} className="w-48 h-28 bg-gray-700/50 hover:bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors text-center">
      <PlusIcon className="w-6 h-6" />
      <span className="text-xs mt-1 px-2">{label}</span>
      <input type="file" ref={inputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
    </button>
  );
};

interface PromptFormProps {
  onGenerate: (params: GenerateVideoParams) => void;
  initialValues?: GenerateVideoParams | null;
}

const PromptForm: React.FC<PromptFormProps> = ({
  onGenerate,
  initialValues,
}) => {
  const [prompt, setPrompt] = useState(initialValues?.prompt ?? '');
  const [model, setModel] = useState<VeoModel>(initialValues?.model ?? VeoModel.VEO_FAST);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(initialValues?.aspectRatio ?? AspectRatio.LANDSCAPE);
  const [resolution, setResolution] = useState<Resolution>(initialValues?.resolution ?? Resolution.P720);
  const [generationMode, setGenerationMode] = useState<GenerationMode>(initialValues?.mode ?? GenerationMode.TEXT_TO_VIDEO);
  const [startFrame, setStartFrame] = useState<ImageFile | null>(initialValues?.startFrame ?? null);
  const [endFrame, setEndFrame] = useState<ImageFile | null>(initialValues?.endFrame ?? null);
  const [referenceImages, setReferenceImages] = useState<ImageFile[]>(initialValues?.referenceImages ?? []);
  const [styleImage, setStyleImage] = useState<ImageFile | null>(initialValues?.styleImage ?? null);
  const [inputVideo, setInputVideo] = useState<VideoFile | null>(initialValues?.inputVideo ?? null);
  const [inputVideoObject, setInputVideoObject] = useState<Video | null>(initialValues?.inputVideoObject ?? null);
  const [isLooping, setIsLooping] = useState(initialValues?.isLooping ?? false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modeSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialValues) {
      setPrompt(initialValues.prompt ?? '');
      setModel(initialValues.model ?? VeoModel.VEO_FAST);
      setAspectRatio(initialValues.aspectRatio ?? AspectRatio.LANDSCAPE);
      setResolution(initialValues.resolution ?? Resolution.P720);
      setGenerationMode(initialValues.mode ?? GenerationMode.TEXT_TO_VIDEO);
      setStartFrame(initialValues.startFrame ?? null);
      setEndFrame(initialValues.endFrame ?? null);
      setReferenceImages(initialValues.referenceImages ?? []);
      setStyleImage(initialValues.styleImage ?? null);
      setInputVideo(initialValues.inputVideo ?? null);
      setInputVideoObject(initialValues.inputVideoObject ?? null);
      setIsLooping(initialValues.isLooping ?? false);
    }
  }, [initialValues]);

  useEffect(() => {
    if (generationMode === GenerationMode.REFERENCES_TO_VIDEO) {
      setModel(VeoModel.VEO);
      setAspectRatio(AspectRatio.LANDSCAPE);
      setResolution(Resolution.P720);
    } else if (generationMode === GenerationMode.EXTEND_VIDEO) {
      setResolution(Resolution.P720);
    }
  }, [generationMode]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [prompt]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modeSelectorRef.current && !modeSelectorRef.current.contains(event.target as Node)) {
        setIsModeSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      prompt, model, aspectRatio, resolution, mode: generationMode,
      startFrame, endFrame, referenceImages, styleImage, inputVideo, inputVideoObject, isLooping,
    });
  }, [prompt, model, aspectRatio, resolution, generationMode, startFrame, endFrame, referenceImages, styleImage, inputVideo, inputVideoObject, onGenerate, isLooping]);

  const handleSelectMode = (mode: GenerationMode) => {
    setGenerationMode(mode);
    setIsModeSelectorOpen(false);
    setStartFrame(null);
    setEndFrame(null);
    setReferenceImages([]);
    setStyleImage(null);
    setInputVideo(null);
    setInputVideoObject(null);
    setIsLooping(false);
  };

  const promptPlaceholder = {
    [GenerationMode.TEXT_TO_VIDEO]: 'E.g. "A futuristic AR property gallery showing a 3D floor plan in a warehouse..."',
    [GenerationMode.FRAMES_TO_VIDEO]: 'E.g. "Transition between a physical room and its AR overlaid counterpart..."',
    [GenerationMode.REFERENCES_TO_VIDEO]: 'Describe the AR interface details...',
    [GenerationMode.EXTEND_VIDEO]: 'Describe the user interacting with the virtual menu...',
  }[generationMode];

  const selectableModes = [
    GenerationMode.TEXT_TO_VIDEO,
    GenerationMode.FRAMES_TO_VIDEO,
    GenerationMode.REFERENCES_TO_VIDEO,
  ];

  const renderMediaUploads = () => {
    if (generationMode === GenerationMode.FRAMES_TO_VIDEO) {
      return (
        <div className="mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <ImageUpload label="Initial State" image={startFrame} onSelect={setStartFrame} onRemove={() => { setStartFrame(null); setIsLooping(false); }} />
            {!isLooping && <ImageUpload label="AR Overlay" image={endFrame} onSelect={setEndFrame} onRemove={() => setEndFrame(null)} />}
          </div>
          {startFrame && !endFrame && (
            <div className="mt-3 flex items-center">
              <input id="loop-video-checkbox" type="checkbox" checked={isLooping} onChange={(e) => setIsLooping(e.target.checked)} className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 cursor-pointer" />
              <label htmlFor="loop-video-checkbox" className="ml-2 text-sm font-medium text-gray-300 cursor-pointer">Infinite AR loop</label>
            </div>
          )}
        </div>
      );
    }
    if (generationMode === GenerationMode.REFERENCES_TO_VIDEO) {
      return (
        <div className="mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex flex-wrap items-center justify-center gap-2">
          {referenceImages.map((img, index) => (
            <ImageUpload key={index} image={img} label="" onSelect={() => {}} onRemove={() => setReferenceImages((imgs) => imgs.filter((_, i) => i !== index))} />
          ))}
          {referenceImages.length < 3 && <ImageUpload label="Add Concept Ref" onSelect={(img) => setReferenceImages((imgs) => [...imgs, img])} />}
        </div>
      );
    }
    if (generationMode === GenerationMode.EXTEND_VIDEO) {
      return (
        <div className="mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex items-center justify-center gap-4">
          <VideoUpload label="Base Interaction" video={inputVideo} onSelect={setInputVideo} onRemove={() => { setInputVideo(null); setInputVideoObject(null); }} />
        </div>
      );
    }
    return null;
  };

  const isRefMode = generationMode === GenerationMode.REFERENCES_TO_VIDEO;
  const isExtendMode = generationMode === GenerationMode.EXTEND_VIDEO;
  let isSubmitDisabled = false;
  let tooltipText = '';

  switch (generationMode) {
    case GenerationMode.TEXT_TO_VIDEO:
      isSubmitDisabled = !prompt.trim();
      if (isSubmitDisabled) tooltipText = 'Enter a visualization prompt.';
      break;
    case GenerationMode.FRAMES_TO_VIDEO:
      isSubmitDisabled = !startFrame;
      if (isSubmitDisabled) tooltipText = 'Input frame required.';
      break;
    case GenerationMode.REFERENCES_TO_VIDEO:
      isSubmitDisabled = referenceImages.length === 0 || !prompt.trim();
      if (isSubmitDisabled) tooltipText = 'Reference and prompt required.';
      break;
    case GenerationMode.EXTEND_VIDEO:
      isSubmitDisabled = !inputVideoObject;
      if (isSubmitDisabled) tooltipText = 'Input video from Studio required.';
      break;
  }

  return (
    <div className="relative w-full">
      {isSettingsOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 shadow-2xl z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomSelect label="Engine" value={model} onChange={(e) => setModel(e.target.value as VeoModel)} icon={<SparklesIcon className="w-5 h-5 text-gray-400" />} disabled={isRefMode}>
              {Object.values(VeoModel).map((modelValue) => (
                <option key={modelValue} value={modelValue}>{modelValue}</option>
              ))}
            </CustomSelect>
            <CustomSelect label="Aspect Ratio" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as AspectRatio)} icon={<RectangleStackIcon className="w-5 h-5 text-gray-400" />} disabled={isRefMode || isExtendMode}>
              {Object.entries(aspectRatioDisplayNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </CustomSelect>
            <CustomSelect label="Quality" value={resolution} onChange={(e) => setResolution(e.target.value as Resolution)} icon={<TvIcon className="w-5 h-5 text-gray-400" />} disabled={isRefMode || isExtendMode}>
              <option value={Resolution.P720}>720p (Extendable)</option>
              <option value={Resolution.P1080}>1080p (High Res)</option>
            </CustomSelect>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full">
        {renderMediaUploads()}
        <div className="flex items-end gap-2 bg-[#1f1f1f] border border-gray-700 rounded-2xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-indigo-500/50">
          <div className="relative" ref={modeSelectorRef}>
            <button type="button" onClick={() => setIsModeSelectorOpen((prev) => !prev)} className="flex shrink-0 items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-all">
              {modeIcons[generationMode]}
              <span className="font-bold text-xs whitespace-nowrap">{generationMode}</span>
            </button>
            {isModeSelectorOpen && (
              <div className="absolute bottom-full mb-2 w-56 bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-30">
                {selectableModes.map((mode) => (
                  <button key={mode} type="button" onClick={() => handleSelectMode(mode)} className={`w-full text-left flex items-center gap-3 p-3 hover:bg-indigo-600/20 ${generationMode === mode ? 'bg-indigo-600/40 text-white font-bold' : 'text-gray-400'}`}>
                    {modeIcons[mode]}
                    <span className="text-sm">{mode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <textarea ref={textareaRef} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={promptPlaceholder} className="flex-grow bg-transparent focus:outline-none resize-none text-base text-gray-200 placeholder-gray-600 max-h-48 py-2 font-medium" rows={1} />
          <button type="button" onClick={() => setIsSettingsOpen((prev) => !prev)} className={`p-2.5 rounded-full transition-colors ${isSettingsOpen ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-800 hover:text-white'}`}>
            <SlidersHorizontalIcon className="w-5 h-5" />
          </button>
          <div className="relative group">
            <button type="submit" className="p-3 bg-indigo-600 rounded-xl hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 transition-all shadow-lg" disabled={isSubmitDisabled}>
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </button>
            {isSubmitDisabled && tooltipText && (
              <div role="tooltip" className="absolute bottom-full right-0 mb-2 w-max px-3 py-1.5 bg-gray-900 border border-gray-700 text-white text-[10px] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 font-bold uppercase tracking-widest">
                {tooltipText}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;

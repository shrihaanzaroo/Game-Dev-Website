import { useEffect, useRef } from 'react';

import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { GlobalBackground } from './video_scenes/GlobalBackground';
import { PersistentLogo } from './video_scenes/PersistentLogo';
import { Scene1Intro } from './video_scenes/Scene1Intro';
import { Scene2WhatWeDo } from './video_scenes/Scene2WhatWeDo';
import { Scene3Collab } from './video_scenes/Scene3Collab';
import { Scene4Outro } from './video_scenes/Scene4Outro';

// Total video length: ~27 seconds
export const SCENE_DURATIONS = {
  intro: 5000,    // 0 -> 5s
  whatWeDo: 7000, // 5s -> 12s
  collab: 7000,   // 12s -> 19s
  outro: 8000,    // 19s -> 27s
};

const SCENE_COMPONENTS = {
  intro: Scene1Intro,
  whatWeDo: Scene2WhatWeDo,
  collab: Scene3Collab,
  outro: Scene4Outro,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const output: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, duration] of Object.entries(SCENE_DURATIONS)) {
    output[key] = cumulativeMs / 1000;
    cumulativeMs += duration;
  }
  return output;
})();

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_COMPONENTS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > 0.18) audio.currentTime = targetTime;
    audio.play().catch(() => {});
  }, [baseSceneKey, currentSceneKey, muted]);

  return (
    <div
      className="w-full h-[100vh] overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      {/* Global persistent layers that animate across scenes */}
      <GlobalBackground currentScene={sceneIndex} />
      <PersistentLogo currentScene={sceneIndex} />

      {/* Scene content that mounts/unmounts */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </div>
  );
}

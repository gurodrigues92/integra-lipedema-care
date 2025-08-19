import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'small' | 'normal' | 'large';
  reducedMotion: boolean;
  screenReader: boolean;
}

export const AccessibilityManager = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'normal',
    reducedMotion: false,
    screenReader: false
  });
  
  const [isOpen, setIsOpen] = useState(false);

  // Detect system preferences
  useEffect(() => {
    const mediaQueries = {
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      largeFonts: window.matchMedia('(prefers-font-size: large)')
    };

    const updateSettings = () => {
      setSettings(prev => ({
        ...prev,
        highContrast: mediaQueries.highContrast.matches,
        reducedMotion: mediaQueries.reducedMotion.matches,
        fontSize: mediaQueries.largeFonts.matches ? 'large' : 'normal'
      }));
    };

    // Initial detection
    updateSettings();

    // Listen for changes
    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updateSettings);
    });

    return () => {
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updateSettings);
      });
    };
  }, []);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Font size
    root.classList.remove('font-small', 'font-normal', 'font-large');
    root.classList.add(`font-${settings.fontSize}`);
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Screen reader optimizations
    if (settings.screenReader) {
      root.classList.add('screen-reader-optimized');
    } else {
      root.classList.remove('screen-reader-optimized');
    }
  }, [settings]);

  // Enhanced focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip links with Alt + S
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const skipLink = document.getElementById('skip-to-main');
        if (skipLink) {
          skipLink.focus();
        }
      }
      
      // Accessibility panel with Alt + A
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <>
      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <a
          id="skip-to-main"
          href="#main-content"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
        >
          Pular para conteúdo principal (Alt + S)
        </a>
      </div>

      {/* Accessibility Toolbar */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg",
            "flex items-center justify-center transition-all duration-200",
            "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
          aria-label="Opções de acessibilidade (Alt + A)"
          title="Opções de acessibilidade (Alt + A)"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </button>

        {/* Accessibility Panel */}
        <div
          className={cn(
            "absolute top-16 right-0 w-80 bg-card border border-border rounded-lg shadow-xl p-6 space-y-4 transition-all duration-200",
            isOpen 
              ? "opacity-100 visible translate-y-0" 
              : "opacity-0 invisible -translate-y-2"
          )}
          role="dialog"
          aria-labelledby="accessibility-title"
          aria-hidden={!isOpen}
        >
          <h3 id="accessibility-title" className="text-lg font-semibold mb-4">
            Opções de Acessibilidade
          </h3>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <label htmlFor="high-contrast" className="text-sm font-medium">
              Alto Contraste
            </label>
            <button
              id="high-contrast"
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                settings.highContrast ? "bg-primary" : "bg-muted"
              )}
              role="switch"
              aria-checked={settings.highContrast}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  settings.highContrast ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Tamanho da Fonte
            </label>
            <div className="flex gap-2">
              {(['small', 'normal', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSetting('fontSize', size)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-md border transition-colors",
                    settings.fontSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted"
                  )}
                  aria-pressed={settings.fontSize === size}
                >
                  {size === 'small' ? 'Pequena' : size === 'normal' ? 'Normal' : 'Grande'}
                </button>
              ))}
            </div>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <label htmlFor="reduced-motion" className="text-sm font-medium">
              Reduzir Animações
            </label>
            <button
              id="reduced-motion"
              onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                settings.reducedMotion ? "bg-primary" : "bg-muted"
              )}
              role="switch"
              aria-checked={settings.reducedMotion}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  settings.reducedMotion ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          {/* Screen Reader Optimization */}
          <div className="flex items-center justify-between">
            <label htmlFor="screen-reader" className="text-sm font-medium">
              Otimização para Leitor de Tela
            </label>
            <button
              id="screen-reader"
              onClick={() => updateSetting('screenReader', !settings.screenReader)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                settings.screenReader ? "bg-primary" : "bg-muted"
              )}
              role="switch"
              aria-checked={settings.screenReader}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  settings.screenReader ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <div className="pt-4 border-t border-border text-xs text-muted-foreground">
            <p>Use Alt + A para abrir/fechar</p>
            <p>Use Alt + S para pular para o conteúdo</p>
          </div>
        </div>
      </div>

      {/* Live Region for Screen Readers */}
      <div
        id="accessibility-announcements"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </>
  );
};
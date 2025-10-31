import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Оптимизация производительности
  build: {
    // Минификация с использованием встроенного минификатора Rolldown
    minify: true,

    // Целевая поддержка браузеров для оптимального размера бандла
    target: 'es2015',

    // Code splitting для оптимальной загрузки
    rollupOptions: {
      output: {
        // Разделение vendor библиотек для лучшего кеширования
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React и React Router в отдельный chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            // Lucide icons в отдельный chunk (если используются много иконок)
            if (id.includes('lucide-react')) {
              return 'icons';
            }
          }
        },
        // Оптимизированные имена для chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Проверка на существование имени файла
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]'

          // Группировка ассетов по типам
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },

    // Увеличение лимита предупреждения о размере chunk (500kb)
    chunkSizeWarningLimit: 500,

    // Source maps только для production (убираем для меньшего размера)
    sourcemap: false,

    // CSS code splitting
    cssCodeSplit: true,

    // Оптимизация ассетов
    assetsInlineLimit: 4096, // Inline ассеты меньше 4kb
  },

  // Оптимизация сервера разработки
  server: {
    // Оптимизация горячей перезагрузки
    hmr: {
      overlay: true,
    },
    // Открывать браузер автоматически
    open: false,
  },

  // Предварительная оптимизация зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [],
  },
})

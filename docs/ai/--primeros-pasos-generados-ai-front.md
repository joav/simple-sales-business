### Plan de Trabajo: Creación del Frontend y Dashboard de Métricas

---

#### **Fase 1: Configuración Inicial del Proyecto**

1.  **Crear la Aplicación React:**
    Utilizaremos Vite.js con la plantilla de TypeScript para inicializar el proyecto en un nuevo directorio `frontend`. Esto nos dará una base moderna y rápida.
    *   **Comando:** `npm create vite@latest frontend -- --template react-ts`

2.  **Instalar Dependencias Iniciales:**
    Navegaremos al nuevo directorio e instalaremos las dependencias básicas del proyecto.
    *   **Comando:** `cd frontend && npm install`

3.  **Crear la Estructura de Directorios:**
    Crearé la estructura de carpetas que propusiste. Esto establecerá el esqueleto de nuestra "screaming architecture" desde el principio.
    *   **Comandos:**
        ```bash
        mkdir -p src/features/shared/ui/atoms
        mkdir -p src/features/shared/ui/molecules
        mkdir -p src/features/shared/ui/organisms
        mkdir -p src/features/shared/ui/templates
        mkdir -p src/features/shared/ui/pages
        mkdir -p src/features/shared/hooks
        mkdir -p src/features/shared/models
        mkdir -p src/features/shared/services
        mkdir -p src/features/shared/state
        mkdir -p src/features/shared/utils
        mkdir -p src/features/metrics
        ```

#### **Fase 2: Construcción de Componentes del Dashboard**

4.  **Crear Componentes Atómicos Genéricos (Atoms):**
    Comenzaremos con los componentes más pequeños y reutilizables que servirán de base para todo el dashboard.
    *   `src/features/shared/ui/atoms/Card.tsx`: Un contenedor genérico para mostrar cualquier tipo de información.
    *   `src/features/shared/ui/atoms/Title.tsx`: Un componente para los títulos de las tarjetas o secciones.
    *   `src/features/shared/ui/atoms/Spinner.tsx`: Un indicador de carga.

5.  **Crear Componentes Específicos de Métricas (Organisms):**
    Basado en los diagramas, construiremos los componentes principales que mostrarán cada tipo de métrica. Inicialmente, contendrán datos de ejemplo.
    *   `src/features/metrics/ui/organisms/RankingList.tsx`: Para mostrar rankings (ej. "Top 5 Productos más vendidos").
    *   `src/features/metrics/ui/organisms/AggregateValueCard.tsx`: Para mostrar valores agregados (ej. "Ventas totales del mes").
    *   `src/features/metrics/ui/organisms/TimeSeriesChart.tsx`: Para mostrar la evolución de datos en el tiempo (ej. "Ventas por día"). Aquí podríamos usar una librería de gráficos como `recharts` o `chart.js`.

#### **Fase 3: Ensamblaje y Conexión de Datos**

6.  **Crear la Página del Dashboard (Page):**
    Ensamblaremos los organismos creados en el paso anterior dentro de un componente de página.
    *   `src/features/metrics/ui/pages/DashboardPage.tsx`: Este componente importará y renderizará `RankingList`, `AggregateValueCard` y `TimeSeriesChart` para formar el layout completo del dashboard.

7.  **Configurar el Enrutamiento Básico:**
    Modificaremos `src/App.tsx` para que renderice nuestra `DashboardPage` como la página principal.

8.  **Crear Servicios de Datos:**
    Crearemos los hooks o servicios necesarios para obtener los datos desde tu API REST.
    *   `src/features/metrics/services/metrics.service.ts`: Contendrá la lógica para hacer las peticiones `fetch` a los endpoints de métricas del backend.
    *   `src/features/metrics/hooks/useMetrics.ts`: Un custom hook que utilizará el servicio para gestionar el estado de los datos (carga, error, datos recibidos).

9.  **Integrar Datos en los Componentes:**
    Finalmente, conectaremos el hook `useMetrics` a los componentes de la `DashboardPage` para reemplazar los datos de ejemplo con los datos reales provenientes de la API.

---
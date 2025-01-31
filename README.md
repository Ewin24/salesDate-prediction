```markdown
# Sales Date Prediction - Frontend (Angular 18)

## 📋 Descripción
Aplicación Angular que visualiza los requerimientos del proyecto:
- Gráficos predictivos de próximas órdenes
- Listado interactivo de clientes
- Formulario para creación de nuevas órdenes

## 🚀 Requisitos Previos
- Node.js v18.x+
- npm v9.x+ o bun v1.x+
- Angular CLI v18.x

## ⚙️ Configuración Inicial

### 1. Clonar Repositorio
```bash
git clone https://github.com/Ewin24/salesDate-prediction.git
cd frontend
```

### 2. Configurar URLs de la API
Editar los siguientes archivos:

**src/app/core/services/customer.service.ts**
```typescript
private apiUrl = 'https://localhost:7053/api/Customer'; // ← Cambiar por tu URL
```

**src/app/core/services/order.service.ts**
```typescript
private apiUrl = 'https://localhost:7053/api/Orders'; // ← Cambiar por tu URL
```

### 3. Instalar Dependencias
```bash
npm install
# o usando bun
bun install
```

## ▶️ Ejecución
```bash
ng serve --open
```
La aplicación estará disponible en: `http://localhost:4200`

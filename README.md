# CafeGenie-UI

## Overview

CafeGenie-UI is a modern, feature-rich dashboard application designed for cafe or restaurant management. It serves as the frontend for the CafeGenie platform, providing an interactive interface for monitoring sales, inventory, orders, and business analytics. The UI is built with Next.js and TypeScript, features responsive layouts, customizable themes, and tightly integrates with the CafeGenie backend via RESTful APIs.

## Features

- **Dashboard**: Visualize sales data, order volume, and trends with interactive charts and data cards.
- **Sales Analytics**: Pie charts and line graphs for product/category sales and time-based analytics.
- **Order Management**: Create new orders, view and filter order lists, update order statuses.
- **Inventory Tracking**: (Planned/partially implemented) View and manage available stock.
- **User Account Area**: User profile, account, billing, and notification management in the sidebar.
- **Custom Themes**: Easily switch between dark/light mode and multiple color themes, with user preferences stored in cookies.
- **Modular Sidebar Navigation**: Quick access to Dashboard, Sales, Inventory, Orders, Settings, Reports, and more.
- **Reusable Components**: Data tables with drag-and-drop, charts using `recharts` and `chart.js`, responsive layout containers.
- **Extensible**: Add new pages or features by editing the `/app` and `/components` directories.

## Main Modules & User Flow

- **Sidebar & Navigation**: The sidebar (see `AppSidebar`) organizes navigation into main (Dashboard, Sales, Inventory, Orders) and secondary (Settings, Help, Search) sections.
- **Dashboard Page**: Integrates components like `ChartAreaInteractive`, `SectionCards`, and `NewOrder` to provide insights and quick actions.
- **Sales Page**: Uses charts (Pie, Line) to visualize product/category/time-based sales.
- **Order Management**: Components for listing, filtering, and updating orders (integrates with backend APIs).
- **User Profile**: Dropdown user menu for account, billing, and logout.

## API Integration

- Communicates with CafeGenie backend (see its `/app.py` for endpoints) via RESTful APIs:
  - `/predict/`, `/sales-forecast-week/` for analytics/forecasting
  - `/place-order/`, `/update-order-status/`, `/get-orders/` for order management
- All data interactions (charts, orders, inventory) are dynamically populated via API requests.

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- pnpm, npm, or yarn

### Installation

```bash
pnpm install
# or
npm install
```

### Development

```bash
pnpm dev
# or
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
pnpm build
# or
npm run build
```

## Project Structure

- `/app`: Page routes (Dashboard, Sales, Orders, etc.)
- `/components`: Reusable UI and logic components (Sidebar, DataTable, Charts, etc.)
- `/public`: Static assets (images, icons)
- `/styles`: Global styles

## Customization

- **Add Pages**: Create a new file in `/app` (e.g., `/app/inventory/page.tsx`)
- **Extend Components**: Add or edit React components in `/components`
- **Theme**: Customize theme logic in `/components/active-theme.tsx` and `/styles`

## Contributing

Pull requests and issues are welcome!

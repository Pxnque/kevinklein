// pages/hombre.tsx
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

export default function Hombre() {
  return (
    <>
      <div className="flex">
        {/* <Navbar /> */}
        <br />
        <br />
            <Sidebar /> {/* Componente de navegación lateral */}
        <div>
        </div>
        <br />
        <main className="flex-grow p-4">
          <h1>Sección Hombre</h1>
          {/* Contenido de la página */}
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
}

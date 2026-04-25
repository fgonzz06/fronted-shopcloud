function Perfil() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>
      <p className="text-gray-600">Próximamente: Información de usuario</p>

      {/* GIF de carga */}
      <img 
        src="https://cdn-icons-gif.flaticon.com/17905/17905749.gif"
        alt="Cargando..."
        className="w-32 h-32 mb-6 rounded-full"
      />
      
      <div className="bg-gray-100 rounded-lg p-4 max-w-md">
        <p className="text-gray-600 text-sm">Sección en construcción (50%)</p>
        <p className="text-gray-400 text-xs mt-2">Próximamente: Visualizacion Completa del perfil</p>
      </div>
    </div>
  );
}

export default Perfil;
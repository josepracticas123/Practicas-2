function PortalPage(){

    const miniapps = [
    {
      id: "tareas",
      titulo: "Tareas",
      descripcion: "Organiza tus tareas, complétas y recupera las que necesites.",
      accion: "Abrir tareas",
      ruta: "/tareas",

    },
    {
      id: "quiz",
      titulo: "Quiz de React",
      descripcion: "Pon a prueba tus conocimientos de React.",
      accion: "Próximamente...",
    }
  ]
    return(
        <section className="px-6 py-10 text-white">
            <h2 className="mb-8 text-center text-4xl font-bold">Portal de miniapps</h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                {miniapps.map((miniapp) => (
                    <div key={miniapp.id}
                    className="rounded-xl border border-gray-400 bg-gray-300 p-6 text-gray-900 shadow-lg">
                        <h3 className="mb-3 text-2xl font-semibold">{miniapp.titulo}</h3>
                        <p className="mb-5 text-gray-700">{miniapp.descripcion}</p>
                        <span className=" text-gray-700">{miniapp.accion}</span>
                    </div>
                ))}
            
            </div>
        </section>
    );

}
export default PortalPage;
import MiniappCards from "../components/MiniappCards";

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
                {/*Pasamos los objetos a las tarjetas de miniappcards, para pintar la información. */}
                {miniapps.map((miniapp) => (
                    <MiniappCards 
                    key={miniapp.id}
                    miniapp={miniapp}/>
                ))}            
            </div>
        </section>
    );

}
export default PortalPage;
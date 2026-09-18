import {Link} from "react-router";
function MiniappCards({ miniapp }) {
    return (

        <div key={miniapp.id}
            className="rounded-xl border border-gray-400 bg-gray-300 p-6 text-gray-900 shadow-lg">

            {/* exponemos los datos de los objetos que tenemos en portalPages, sobre los objetos allí creados */}
            <h3 className="mb-3 text-2xl font-semibold">
                {miniapp.titulo}
            </h3>
            <p className="mb-5 text-gray-700">
                {miniapp.descripcion}
            </p>

            {/*Condicional que revisa si hay ruta o no, como quiz no tiene ruta mostrara el span.*/}
            {miniapp.ruta ? (
                <Link 
                className="inline-block rounded-lg bg-slate-600 px-4 py-2 text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                to={miniapp.ruta}>
                    {miniapp.accion}
                </Link>
                ) : (
                    <span>{miniapp.accion}</span>
                ) 
            }
        </div>
    );
}
export default MiniappCards;
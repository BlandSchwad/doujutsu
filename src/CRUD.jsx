import api from "./assets/api";
import { Button } from "react-bootstrap";
import LibraryForm from "./features/forms/LibraryForm";
import DeleteModal from "./features/modals/DeleteModal";
import Bar from "./Bar";
import {
  useAddNewLibraryMutation,
  useDeleteLibraryMutation,
  useGetAllLibrariesQuery,
  usePatchLibraryMutation,
} from "./services/mangaserver";

function Crud() {
  const { data, error, loadingLibraries } = useGetAllLibrariesQuery();
  const [deleteLibrary] = useDeleteLibraryMutation();

  return (
    <div>
      <Bar />
      {error ? (
        <>ERROR</>
      ) : loadingLibraries ? (
        <>LOADING</>
      ) : data ? (
        <>
          <h1>Libraries </h1>
          {data.map((library) => {
            return (
              <div key={library.id} className="libraryView">
                <ul>
                  {library.name}
                  <li>ID: {library.id} </li>
                  <li>
                    Created:{" "}
                    {new Date(parseInt(library.created_date)).toString()}
                  </li>
                  <li>
                    Last Modified:{" "}
                    {new Date(parseInt(library.last_modified_date)).toString()}
                  </li>
                  <li>Path: {library.file_path} </li>
                </ul>
                {/* <Button
                  onClick={() => {
                    deleteLibrary(library.id);
                  }}
                >
                  Delete
                </Button>{" "} */}
                <DeleteModal type="Library" info={library} />
                <LibraryForm
                  type="edit"
                  info={{
                    id: library.id,
                    name: library.name,
                    path: library.file_path,
                  }}
                />
                <Button
                  onClick={() => {
                    api
                      .get(`/library/scan/${library.id}`)
                      .then(() => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Scan
                </Button>
              </div>
            );
          })}{" "}
        </>
      ) : null}

      <LibraryForm type="add" />
    </div>
  );
}

export default Crud;

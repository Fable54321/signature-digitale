import { useForeignWorker } from "../../Contexts/ForeignWorkerContext";

const ContractPage = () => {
  const {
    pin,
    setPin,
    worker,
    error,
    loading,
    pdfLoading,
    pdfUrl,
    lookupByPin,
    generateContractPdf,
  } = useForeignWorker();

  const handleLookup = async () => {
    await lookupByPin();
  };

  const handleGeneratePdf = async () => {
    await generateContractPdf();
  };

  return (
    <article className="flex flex-col items-center w-full">
      <div className="w-[90%] max-w-5xl mt-10 flex flex-col gap-6">
        <h2 className="text-[1.8em] font-primary text-center">
          Contrat travailleur
        </h2>

        <div className="flex flex-col gap-3 max-w-sm">
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="Entrer le PIN"
            className="border-2 border-secondary rounded-md p-2"
          />

          <button
            onClick={handleLookup}
            disabled={loading}
            className="rounded-md bg-secondary text-white py-2 font-bold disabled:opacity-50"
          >
            {loading ? "Vérification..." : "Vérifier le PIN"}
          </button>

          <button
            onClick={handleGeneratePdf}
            disabled={pdfLoading}
            className="rounded-md bg-secondary text-white py-2 font-bold disabled:opacity-50"
          >
            {pdfLoading ? "Génération..." : "Afficher le PDF"}
          </button>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {worker && (
          <div className="rounded-md border p-4 bg-white">
            <p>
              <strong>Nom :</strong> {worker.surname} {worker.name}
            </p>
            <p>
              <strong>Poste :</strong> {worker.job_title}
            </p>
            <p>
              <strong>Pays :</strong> {worker.residence_country}
            </p>
          </div>
        )}

        {pdfUrl && (
          <iframe
            src={pdfUrl}
            title="Contrat PDF"
            className="w-full h-225 border rounded-md bg-white"
          />
        )}
      </div>
    </article>
  );
};

export default ContractPage;
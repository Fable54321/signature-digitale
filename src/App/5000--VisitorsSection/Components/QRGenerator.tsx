import { QRCode } from "react-qr-code";


type Props = {
    url: string;
};

const QRGenerator = ({ url }: Props) => {
   



    // const handleSubmit = async (e: React.FormEvent) => {
    
    // };


const appUrl = import.meta.env.VITE_APP_URL


    return (
        <article className="w-full space-y-6">
          

                        {/* QR block */}
                        <div className=" flex flex-col gap-2 justify-center items-center flex-1">
                            
                            <QRCode
                                value={`${appUrl}${url}`}
                                size={150}
                            />
                         
                        </div>

                    
             


        </article>
    );
};

export default QRGenerator;

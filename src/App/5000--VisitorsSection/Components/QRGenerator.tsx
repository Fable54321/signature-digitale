import { QRCode } from "react-qr-code";


type Props = {
    url: string;
};

const QRGenerator = ({ url }: Props) => {
   








    return (
        <article className="w-full space-y-6">
          

                        {/* QR block */}
                        <div className=" flex flex-col gap-2 justify-center items-center flex-1">
                            
                            <QRCode
                                value={`${url}`}
                                size={150}
                            />
                         
                        </div>

                    
             


        </article>
    );
};

export default QRGenerator;

import { QRCode } from "react-qr-code";


type Props = {
    url: string;
};

const QRGenerator = ({ url }: Props) => {
   








    return (
        <article className="w-full space-y6 flex flex-col gap-2 justify-center items-center ">
          

                        {/* QR block */}
                        <div className=" p-4 rounded-xl bg-[#e5ebd5] w-fit">
                            
                            <QRCode
                                value={`${url}`}
                                size={200}
                            />
                         
                        </div>

                    
             


        </article>
    );
};

export default QRGenerator;

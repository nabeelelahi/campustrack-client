import QRCode from 'react-qr-code';
import { UserLayout } from '../component/partial/Layout/User';
import { Card } from 'antd';
import { useParams } from 'react-router-dom';

export function QRCodePage() {
    const { _id } = useParams()
    
    return (
        <UserLayout>
            <div className='container mx-auto my-5'>
                <div className='grid grid-cols-2 gap-4'>
                    <Card className="shadow-md">
                        <h2 className="font-semibold mb-4">Entry</h2>
                        <QRCode value={`http://${location.host}/qr/check-in/${_id}`} className='w-[45vw]' bgColor="#FFFFFF" fgColor="#000000" />
                    </Card>
                    <Card className="shadow-md">
                        <h2 className="font-semibold mb-4">Exit</h2>
                        <QRCode value={`http://${location.host}/qr/check-out/${_id}`} className='w-[45vw]' bgColor="#FFFFFF" fgColor="#000000" />
                    </Card>
                </div>
            </div>
        </UserLayout>
    );
}
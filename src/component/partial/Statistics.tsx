import { Col } from 'antd'
import { useColors } from '../../config/color';

function Statistics(props: { title: string, key: string, value: number }) {
    const colors = useColors();
    return (
        <Col xs={24} sm={12} lg={6}>
            <div className='p-6 rounded-[20px] mb-6' style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }} >
                <h2 className='text-xl poppins-semibold mb-4' style={{ color: colors.TextColor }}>{props.title}</h2>
                <p className="text-3xl poppins-bold" style={{ color: colors.TextColor }}>{props.value}</p>
                {/* <p className={` poppins-regular ${props.change.includes("-") ? "text-[#D0004B]" : "text-[#00AC4F]"} text-[16px]`}> 
                    {props.change.includes("-") ? (
                        <span>
                            <ArrowDownOutlined /> {props.change}
                        </span>
                    ) : (
                        <span>
                            <ArrowUpOutlined /> {props.change}
                        </span>
                    )}
                </p> */}
            </div>
        </Col>
    )
}

export default Statistics
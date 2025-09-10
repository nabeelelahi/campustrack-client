import { Dispatch, SetStateAction } from 'react'
import { QuestionAnswerDto } from '../../../types';

function QuestionCard(props: QuestionAnswerDto & { isActive: boolean; setSelectedQuestion: Dispatch<SetStateAction<QuestionAnswerDto | null>> }) {
    return (
        <li
            key={props._id as string}
            className={`p-2 cursor-pointer rounded ${props.isActive ? "border-1 border border-solid border-[#333333]" : "hover:bg-gray-200"}`}
            onClick={() => props.setSelectedQuestion(props)}
        >
            <h3 className={`font-semibold text-md ${props.isActive ? "text-[#333333]" : ""}`}>{props.title as string}</h3>
            <p className="mb-[1px] text-sm text-gray-600">{props.description}</p>
            <p className="text-xs text-gray-500">By {props.user.name}</p>
        </li>
    )
}

export default QuestionCard

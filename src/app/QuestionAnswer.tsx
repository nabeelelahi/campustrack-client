import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import LayoutAdmin from "../component/partial/Layout/Admin";
import { QuestionAnswerDto, ResponseData } from "../types";
import QuestionCard from "../component/partial/QuestionAnswer/QuestionCard";
import { useRequest } from "../hooks/useRequest";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../component/shared/Loader";

const { TextArea } = Input;

export default function QuestionForum() {
    const { _id } = useParams();
    const [params] = useSearchParams();
    const { data: questions, loading: questionLoading } = useRequest<QuestionAnswerDto[]>("question-answer", "get", {
        type: 'mount',
        params: {
            class: _id,
            parent: null
        }
    });
    const { data: answers, loading: answerLoading, execute, setData: setAnswers } = useRequest<QuestionAnswerDto[]>("question-answer", "get", {
        type: 'delay'
    });
    const { loading: postAnswerLoading, execute: postAnswer } = useRequest<QuestionAnswerDto[]>("question-answer", "post", {
        type: 'delay'
    });
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionAnswerDto | null>();
    const [newAnswer, setNewAnswer] = useState("");

    const handleAddAnswer = () => {
        if (newAnswer.trim()) {
            postAnswer({
                body: {
                    title: newAnswer,
                    community: _id,
                    parent: selectedQuestion?._id
                },
                // @ts-expect-error @ts-ignore
                cbSuccess: (res: ResponseData<QuestionAnswerDto>) => {
                    console.log('[res.data, ...p]', [res.data, ...answers || []])
                    setAnswers(p => [res.data, ...p || []])
                }
            })
            // setSelectedQuestion({
            //     ...selectedQuestion,
            // });
            setNewAnswer("");
        }
    };

    useEffect(() => {
        if (selectedQuestion) {
            execute({
                params: {
                    parent: selectedQuestion._id
                }
            })
        }
    }, [selectedQuestion])

    return (
        <LayoutAdmin>
            <h1 className="text-2xl font-bold my-4 text-center">{params.get('title')}</h1>
            <div className="flex min-h-screen">
                <div className="w-100">
                </div>
                <div className="w-1/4 p-4 bg-white">
                    <h2 className="text-lg font-bold mb-4">Questions</h2>
                    <ul>
                        {questionLoading ? <Loader />
                            :
                            (questions) && questions.map((q) => (
                                <QuestionCard {...q} isActive={q._id === selectedQuestion?._id} 
                                // @ts-expect-error @ts-ignore
                                setSelectedQuestion={setSelectedQuestion}
                                 />
                            ))
                        }
                    </ul>
                </div>
                <div className="flex-1 p-6">
                    <div className="p-4 border">
                        <div>
                            {
                                selectedQuestion ?
                                    <>
                                        <h2 className="font-semibold text-lg text-gray-800 mb-2">{selectedQuestion?.user?.name}</h2>
                                        <p className="text-gray-800">{selectedQuestion?.title}</p>
                                        <p className="mb-4 text-gray-500">{selectedQuestion?.description}</p>
                                        <div className="mt-4">
                                            <TextArea
                                                value={newAnswer}
                                                onChange={(e) => setNewAnswer(e.target.value)}
                                                placeholder="Write your answer..."
                                                className="w-full mb-2 border rounded p-2"
                                            />
                                            <Button className="bg-[#333333] text-white px-4 py-2 rounded" loading={postAnswerLoading} onClick={handleAddAnswer}>Submit Answer</Button>
                                        </div>
                                    </>
                                    :
                                    <div className="h-100 w-100 flex items-center justify-center">
                                        <p className="text-gray-500 text-sm">Please select a question</p>
                                    </div>
                            }
                            <div className="mt-4 space-y-2">
                                {
                                    answerLoading ? <Loader />
                                        :
                                        (answers?.length) ? answers.map((a) => (
                                            <div key={a._id} className="text-sm bg-gray-100 p-3 rounded-md border">
                                                <strong className="text-blue-600">{a.user.name}:</strong> {a.title}
                                            </div>
                                        ))
                                            : selectedQuestion &&
                                            <p className="text-gray-500 text-sm">No answers yet. Be the first to answer!</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}

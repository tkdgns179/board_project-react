import React from 'react'
import Board from '../components/Board/Board';
import { useParams } from 'react-router-dom';
const BoardDetail = () => {
    const params = useParams();
    return <Board boardId={params.id}/>
}

export default BoardDetail;
import React, { Fragment, useEffect, useState } from 'react';
import "../css/rankingOperations.css";

import { useOperations } from "../hooks/useOperations";

const RankingOperations = () => {

    let [ranking, setRanking] = useState({});
    let { rankingOperations } = useOperations();
    
    useEffect(async () => {
        setRanking(await rankingOperations());
    }, [Object.keys(ranking).length != 0])

    return (
        <Fragment>
            <h6 className='h6-last-operations'>Últimas operaciones:</h6>
            {typeof ranking.data != "undefined" ?
            <ul className="list-group list-group-flush">
                {typeof ranking.data != "undefined" ?
                    ranking.data.map((element, id) => {
                        return <li className='list-group-item' key={id}>{element.name}</li>
                    })    
                : <li className='list-group-item'>Loading...</li>
                }
            </ul>
            : <p className={"empty-msg-ranking-p"}>No operations.</p>
            }
        </Fragment>
    )
}

export default RankingOperations;

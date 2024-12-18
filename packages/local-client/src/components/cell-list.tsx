import './cell-list.css'
import React, { Fragment, useEffect } from 'react'
import useTypedSelector from '../hooks/useTypedSelector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { useActions } from '../hooks/useActions';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({cells: {order, data}}) => order.map(id => data[id]));
    const {fetchCells} = useActions();

    useEffect(() => {
      fetchCells()
    }, [])

    const renderedCells = cells.map(cell => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell}/>
            <AddCell previousCellId={cell.id}/>
        </Fragment>
    ))
  return (
    <div className='cell-list'>
        <AddCell forceVisible={cells.length === 0} previousCellId={null}/>
        {renderedCells}
    </div>
  )
}

export default CellList;
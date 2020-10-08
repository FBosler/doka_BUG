import styled from 'styled-components'

export const AspectRatio = styled('div')`
    display: block;
    width: 100%;
    position: relative;
    height: 0;
    padding: 70% 0 0 0;
    min-height: 380px;
`

export const DivFlexLeft = styled('div')`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 6px;
    padding-bottom: 6px;
`

export const DropZone = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 3px;
    border-radius: 2px;
    border-color: #cacaca;
    border-style: dashed;
    background-color: #fafafa;
    color: #333;
    outline: none;
    text-align: center;
    transition: border 0.24s ease-in-out;
    &:hover {
        background-color: #dadada;
        cursor: pointer;
        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12),
            0 1px 5px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
`

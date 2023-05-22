import Accordion from '../../components/accordion';
import { dataFAQ } from './dataFAQ';
import s from './stlyes.module.css'

function FaqPage() {


    return ( 
        <>
            <h1>Часто спрашивают</h1>
            {dataFAQ.map((data, i) => <Accordion key={i} title={data.title}>{data.content}</Accordion>)}
        </>
    );
}

export default FaqPage;


import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from 'src/App';
import { IAppState } from 'src/types';
import { ContentContainer } from 'src/components/ContentContainer';
import { GrabbingFeed } from 'src/components/GrabbingFeed';
import { PageTitle } from 'src/components/Title';

export const OldGrabbings: React.SFC<{}> = () => {
  const { oldGrabbings } = useContext(AppContext) as IAppState;
  const batches = oldGrabbings.reduce((acc: string[], curr) => {
    if (!acc.includes(curr.batch)) return [...acc, curr.batch];
    return acc;
  }, []);
  batches.sort().reverse();
  const [batch, setBatch] = useState(batches[0] || '');

  const onBatchChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setBatch(event.currentTarget.value);

  return (
    <>
      <ContentContainer>
        <PageTitle>Vanhat kähmyt</PageTitle>
        <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ float: 'right' }}>
          Takaisin »
        </Link>
        <p>Täällä voit selata vanhoja kähmyjä aiemmilta vuosilta. Valitse valikosta mieluisesi!</p>
        <select onChange={onBatchChange}>
          {batches.map(batchName => (
            <option value={batchName}>{batchName}</option>
          ))}
        </select>
      </ContentContainer>

      <GrabbingFeed grabs={batch ? oldGrabbings.filter(g => g.batch === batch) : oldGrabbings} />
    </>
  );
};

import React, { useState } from 'react';
import { ButtonPill } from 'src/components/ButtonPill';
import { TextArea } from 'src/components/TextArea';
import { postGrabbing } from 'src/functions';

export const GrabbingForm: React.SFC<{}> = () => {
  const [title, setTitle] = useState('');
  const [isBoard, setBoard] = useState(false);
  const [text, setText] = useState('<p>Insert kähmy here!</p>');

  const updateTitle = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.currentTarget.value);
  };

  const updateBoard = (event: React.FormEvent<HTMLInputElement>) => {
    setBoard(event.currentTarget.id === 'board');
  };

  const submit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = {
      title,
      text,
      is_hallitus: isBoard,
      batch: '2018',
      tags: [],
    };
    const resp = await postGrabbing(data);
    console.log(resp);
    if (resp !== false) {
      window.location = ('/kiltalaisille/hallinto/kahmyt/' as unknown) as Location;
    } else {
      alert('nyt kävi hassusti, laita TGssä viestiä @jonesus'); // eslint-disable-line
      console.log(resp);
    }
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">
          <strong>Otsikko:</strong> <i>(esim. haettava virka)</i>
          <input
            className="title-input"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={updateTitle}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="toggle-label">
          <strong>Haen:</strong>
          <div className="toggle">
            <input id="official" name="is_hallitus" type="radio" onChange={updateBoard} />
            <label className="toggle-label" htmlFor="official">
              Toimariksi
            </label>
            <input id="board" name="is_hallitus" type="radio" onChange={updateBoard} />
            <label className="toggle-label" htmlFor="board">
              Hallitukseen
            </label>
          </div>
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="textarea">
          <strong>Leipäteksti:</strong> <i>(kerro mitä ja miksi, ja vaikka hieman itsestäsi!)</i>
          <TextArea id="textarea" text={text} onChange={setText} />
        </label>
      </div>

      <div className="form-group">
        <ButtonPill callback={submit} text="Kähmyä!" primary />
        <div style={{ marginTop: '1rem', fontSize: '0.8rem;' }}>
          <i>Jos kähmyäminen ei toimi, kokeile Chromella!</i>
        </div>
      </div>
    </form>
  );
};

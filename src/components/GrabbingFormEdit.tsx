import React, { useState } from 'react';
import { putGrabbing } from 'src/functions';
import { IGrabbing } from 'src/types';
import { TextArea } from 'src/components/TextArea';
import { ButtonPill } from 'src/components/ButtonPill';

interface IGrabbingProps extends IGrabbing {
  hideCallback: () => void;
  refreshGrabbings: () => void;
}

export const GrabbingFormEdit: React.SFC<IGrabbingProps> = ({
  hideCallback,
  refreshGrabbings,
  text,
  title,
  is_hallitus,
  ID,
}) => {
  const [titleState, setTitle] = useState(title);
  const [isBoard, setBoard] = useState(is_hallitus);
  const [textState, setText] = useState(text);

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
      title: titleState,
      text: textState,
      is_hallitus: isBoard,
      tags: [],
    };
    if (await putGrabbing(data, ID)) {
      refreshGrabbings();
      console.log('awsum');
    }
    hideCallback();
  };

  const cancel = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    hideCallback();
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">
          <strong>Otsikko:</strong>
          <input
            className="title-input"
            type="text"
            name="title"
            id="title"
            value={titleState}
            onChange={updateTitle}
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="official" className="toggle-label">
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
          <strong>Leipäteksti:</strong>
          <TextArea id="textarea" text={textState} onChange={setText} />
        </label>
      </div>

      <div className="form-group">
        <ButtonPill callback={submit} text="Muuta" primary />
        <ButtonPill callback={cancel} text="Peruuta" />
      </div>
    </form>
  );
};

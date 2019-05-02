import React, { useState } from 'react';
import { TextArea } from 'src/components/TextArea';
import { IComment } from 'src/types';
import { putComment } from 'src/functions';
import { ButtonPill } from 'src/components/ButtonPill';

interface ICommentFormProps extends IComment {
  hideCallback: () => void;
  refreshCallback: () => void;
}

export const CommentFormEdit: React.SFC<ICommentFormProps> = ({
  hideCallback,
  refreshCallback,
  text,
  ID,
}) => {
  const [textState, setText] = useState(text);

  const cancel = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    hideCallback();
  };

  const submit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = {
      text: textState,
    };
    if ((await putComment(data, ID)) !== false) {
      refreshCallback();
      hideCallback();
    } else {
      alert('opi koodaa'); // eslint-disable-line
    }
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="textarea" style={{ lineHeight: '2rem' }}>
          Muokkaa kommenttia:
          <TextArea id="textarea" text={text} onChange={setText} />
        </label>
      </div>
      <div className="form-group">
        <ButtonPill callback={submit} text="Muuta" primary />
        <ButtonPill callback={cancel} text="Peruuta" />
      </div>
    </form>
  );
};

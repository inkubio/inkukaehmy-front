import React, { useState } from 'react';
import { TextArea } from 'src/components/TextArea';
import { ButtonPill } from 'src/components/ButtonPill';
import { postComment } from 'src/functions';

interface ICommentFormProps {
  dropdownText: string;
  parentGrabbingID: number;
  parentCommentID?: number;
  refreshCallback: () => void;
  reply?: boolean;
}

export const CommentForm: React.SFC<ICommentFormProps> = ({
  dropdownText,
  parentGrabbingID,
  parentCommentID,
  refreshCallback,
  reply,
}) => {
  const [isVisible, setVisibility] = useState(false);
  const [text, setText] = useState('<p>Insert kähmy here!</p>');

  const toggleVisible = () => setVisibility(!isVisible);

  const submit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = {
      parent_comment_id: parentCommentID,
      parent_grabbing_id: parentGrabbingID,
      text,
    };
    if ((await postComment(data)) !== false) {
      setText('<p>Kommentti lähetetty! Vielä lisää?</p>');
      setVisibility(false);
      refreshCallback();
    } else {
      alert('opi koodaa'); // eslint-disable-line
    }
  };

  return isVisible ? (
    <>
      <div>
        <a
          className="button-arrow"
          onClick={toggleVisible}
          style={reply ? { fontSize: '0.8rem' } : undefined}
        >
          {dropdownText}
          <i className={`arrow up${reply ? ' small' : ''}`} />
        </a>
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="textarea" style={{ lineHeight: '2rem' }}>
            Uusi kommentti:
            <TextArea id="textarea" text={text} onChange={setText} />
          </label>
        </div>

        <div className="form-group">
          <ButtonPill callback={submit} text="Lähetä!" primary />
        </div>
      </form>
    </>
  ) : (
    <div>
      <a
        className="button-arrow"
        onClick={toggleVisible}
        style={reply ? { fontSize: '0.8rem' } : undefined}
      >
        {dropdownText}
        <i className={`arrow down${reply ? ' small' : ''}`} />
      </a>
    </div>
  );
};

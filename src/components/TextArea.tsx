import * as React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import 'tinymce';

import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';

interface ITextAreaProps {
  text: string;
  onChange: (newText: string) => void;
  id: string;
}

export const TextArea: React.SFC<ITextAreaProps> = ({ text, onChange, id }) => (
  <Editor
    id={id}
    value={text}
    init={{
      entity_encoding: 'raw',
      height: 300,
      width: 'auto',
      images_upload_url: 'https://www.inkubio.fi/kahmyt/imgupload.php',
      menubar: 'edit insert format view',
      paste_data_images: true,
      plugins: 'link image code preview',
      mobile: {
        theme: 'silver',
      },
      toolbar:
        'undo redo | bold italic | alignleft aligncenter alignright | ' +
        '| bullist numlist outdent indent | link image | preview code',
    }}
    onEditorChange={onChange}
  />
);

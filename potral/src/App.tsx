import { type FC } from 'react';
import { CssBaseline } from '@mui/material';
import { MarkdownEditor } from '#/components';

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <MarkdownEditor />
    </>
  );
};

export default App;

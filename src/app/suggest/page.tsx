import { Metadata } from 'next';
import { Suggest } from './ui/suggest';

export const metadata: Metadata = {
  title: 'Artists suggestion',
};

function SuggestPage() {
  return <Suggest />;
}

export default SuggestPage;

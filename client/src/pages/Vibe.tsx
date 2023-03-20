import { useParams } from 'react-router-dom';

export function Vibe() {
  const { id } = useParams();
  return <div>Vibe {id}</div>;
}

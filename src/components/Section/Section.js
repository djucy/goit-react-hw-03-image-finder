import s from './Section.module.css';

export default function Section({ children }) {
  return <div className={s.Section}>{children}</div>;
}

import { codes } from './codes';

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export function CountryCodeSelect({ ...props }: Props) {
  return (
    <select {...props}>
      {(Object.keys(codes) as Array<keyof typeof codes>).map((key, i) => (
        <option value={key} key={`codes-${i}`}>
          {codes[key]}
        </option>
      ))}
    </select>
  );
}

import { FC, useCallback, useState } from "react";

interface props {
  setStage: () => void;
}

const Summary: FC<props> = ({ setStage }) => {
  const [checked, setChecked] = useState(false);
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStage();
    },
    [setStage]
  );

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='summary'>
        check
        <input
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          checked={checked}
          type='checkbox'
          id='summary'
        />
      </label>

      <button type='submit' disabled={!checked}>
        confirm
      </button>
    </form>
  );
};

export default Summary;

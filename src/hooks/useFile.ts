import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useFile(fileString: string): [string, Dispatch<SetStateAction<string>>] {
  const [file, setFile] = useState(fileString);
  useEffect(() => {
    if (fileString.length) setFile(fileString);
  }, [fileString]);
  return [file, setFile];
}

export default useFile;

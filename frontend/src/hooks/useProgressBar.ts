import { useState } from 'react';
import LinearWithValueLabel from 'src/components/progress-bar-label/LinearWithValueLabel';

const useProgressbar = () => {
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(0);
  const [index, setIndex] = useState(1);
  const [countDataProgress, setCountDataProgress] = useState(0);
  const [countPersentageProgress, setCountPersentageProgress] = useState(0);

  const page_divider = +total / +limit;
  const page = Math.ceil(page_divider);
  const divider = 100 / page;
  setCountPersentageProgress(divider * index);

  if (page_divider < 1) {
    setCountDataProgress(page_divider * limit);
  } else if (index === page) {
    setCountDataProgress(page_divider * limit);
  } else {
    setCountDataProgress(limit * index);
  }

  return { setTotal, setLimit, page, setIndex, countDataProgress, countPersentageProgress };
};

export default useProgressbar;

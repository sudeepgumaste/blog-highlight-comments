import clsx from 'clsx'

interface Props {
  orientation: 'horizontal' | 'vertical'
}

const Divider = ({ orientation }: Props) => {
  return (
    <span
      className={clsx(
        'tw-bg-bg-layer-2',
        orientation === 'horizontal'
          ? 'tw-w-full tw-h-[1px]'
          : 'tw-h-full tw-w-[1px]'
      )}
    />
  )
}

export default Divider

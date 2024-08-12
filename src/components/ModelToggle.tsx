import { FormControlLabel, Switch, Tooltip } from '@mui/material';

type Props = {
  tooltipTitle?: string;
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

export default function ModelToggle({
  tooltipTitle,
  onClick,
  label,
  disabled,
}: Props) {
  return (
    <Tooltip title={tooltipTitle || ''}>
      <FormControlLabel
        control={<Switch size='small' onClick={onClick} />}
        label={label}
        disabled={disabled ?? false}
      />
    </Tooltip>
  );
}

export type DialPadProps = Readonly<{
  displayValue: string;
  error?: string | null;
  onDigitPress: (digit: string) => void;
  onBackspace: () => void;
  onCall: () => void;
  controlsDisabled?: boolean;
  backspaceDisabled?: boolean;
  callDisabled?: boolean;
}>;
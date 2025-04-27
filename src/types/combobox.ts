export interface ComboBoxProps {
    label: string;
    placeholder?: string;
    options: ComboBoxOption[];
    className?: string;
    selection: string;
    setSelection: (selection: string) => void;
}

export interface ComboBoxOption {
    name: string;
    logo: string;
}
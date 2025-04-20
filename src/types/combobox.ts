export interface ComboBoxProps {
    label: string;
    placeholder?: string;
    options: ComboBoxOption[];
    className?: string;
}

export interface ComboBoxOption {
    name: string;
    logo: string;
}
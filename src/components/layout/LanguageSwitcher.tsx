import { Check, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={'sm'} className="gap-2 h-9 px-3 rounded-xl">
          <Globe className="h-4 w-4" />
          <span className="font-bold text-xs uppercase">{i18n.language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => handleChange('vi')}
          className="flex items-center justify-between"
        >
          Tiếng Việt
          {i18n.language == 'vi' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleChange('en')}
          className="flex items-center justify-between"
        >
          English
          {i18n.language == 'en' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

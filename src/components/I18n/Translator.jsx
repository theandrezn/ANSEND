import { useTranslation } from "react-i18next";

export default function Translator({ path, values }) {
  const { t } = useTranslation();
  return t(path, values);
}

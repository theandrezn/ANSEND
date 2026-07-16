alter table public.download_logs drop constraint if exists download_logs_file_type_check;

alter table public.download_logs
  add constraint download_logs_file_type_check
  check (file_type in ('mp3', 'wav', 'stems', 'license_pdf'));

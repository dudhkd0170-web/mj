-- ==========================================================
-- Supabase SQL Editor 실행용 DDL 스키마 및 RLS 보안 설정
-- ==========================================================

-- 1. 회전체 데이터를 저장할 테이블 생성
create table if not exists public.rotational_solids (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  author_name text default '익명의 선생님',
  points jsonb not null, -- [{x: number, y: number}] 2차원 좌표 데이터 저장
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. 보안 정책 설정을 위한 Row Level Security (RLS) 활성화
alter table public.rotational_solids enable row level security;

-- 3. 누구나 새로운 회전체를 저장할 수 있도록 INSERT 허용 규칙 추가
create policy "Allow public inserts" 
on public.rotational_solids for insert 
with check (true);

-- 4. 누구나 저장된 회전체 목록을 조회할 수 있도록 SELECT 허용 규칙 추가
create policy "Allow public selects" 
on public.rotational_solids for select 
using (true);

-- ==========================================================
-- 💡 사용 방법:
-- Supabase 대시보드 -> SQL Editor -> 'New Query' 클릭 ->
-- 이 쿼리문을 전체 복사하여 붙여넣은 뒤 'Run' 버튼을 클릭하세요!
-- ==========================================================

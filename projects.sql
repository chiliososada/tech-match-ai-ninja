-- 案件テーブル
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- 案件ID
    tenant_id UUID NOT NULL REFERENCES public.tenants(id), -- 案件所属会社ID (自社・他社案件の区別)
    created_by_user_id UUID REFERENCES public.profiles(id), -- 作成ユーザーID
    title TEXT NOT NULL, -- 案件名
    description TEXT, -- 案件詳細
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'closed', 'filled', 'on_hold', 'pending_approval')), -- ステータス (募集中、進行中、終了、充足、保留中、承認待ち)
    required_skills JSONB, -- 必須スキル (構造化データ)
    preferred_skills JSONB, -- 推奨スキル (構造化データ)
    budget NUMERIC, -- 予算
    start_date DATE, -- 開始予定日
    end_date DATE, -- 終了予定日
    location TEXT, -- 場所
    raw_input_text TEXT, -- AI解析前の案件情報テキスト (メール本文、口頭メモなど)
    source_document_url TEXT, -- 元の案件ドキュメントURL (例: S3バケットのパス)
    source_details TEXT, -- 情報源詳細 (例: "email_extraction", "pdf_import", "manual_entry")
    is_external BOOLEAN DEFAULT false, -- 外部案件フラグ (自社案件でない場合)
    created_at TIMESTAMPTZ DEFAULT now(), -- 作成日時
    updated_at TIMESTAMPTZ DEFAULT now() -- 更新日時
);

-- コメント追加
COMMENT ON TABLE public.projects IS '案件テーブル';
COMMENT ON COLUMN public.projects.id IS '案件ID';
COMMENT ON COLUMN public.projects.tenant_id IS '案件所属会社ID (自社・他社案件の区別)';
COMMENT ON COLUMN public.projects.created_by_user_id IS '作成ユーザーID';
COMMENT ON COLUMN public.projects.title IS '案件名';
COMMENT ON COLUMN public.projects.description IS '案件詳細';
COMMENT ON COLUMN public.projects.status IS 'ステータス (募集中、進行中、終了、充足、保留中、承認待ち)';
COMMENT ON COLUMN public.projects.required_skills IS '必須スキル (構造化データ)';
COMMENT ON COLUMN public.projects.preferred_skills IS '推奨スキル (構造化データ)';
COMMENT ON COLUMN public.projects.budget IS '予算';
COMMENT ON COLUMN public.projects.start_date IS '開始予定日';
COMMENT ON COLUMN public.projects.end_date IS '終了予定日';
COMMENT ON COLUMN public.projects.location IS '場所';
COMMENT ON COLUMN public.projects.raw_input_text IS 'AI解析前の案件情報テキスト (メール本文、口頭メモなど)';
COMMENT ON COLUMN public.projects.source_document_url IS '元の案件ドキュメントURL (例: S3バケットのパス)';
COMMENT ON COLUMN public.projects.source_details IS '情報源詳細 (例: "email_extraction", "pdf_import", "manual_entry")';
COMMENT ON COLUMN public.projects.is_external IS '外部案件フラグ (自社案件でない場合)';
COMMENT ON COLUMN public.projects.created_at IS '作成日時';
COMMENT ON COLUMN public.projects.updated_at IS '更新日時';

-- インデックス作成
CREATE INDEX idx_projects_tenant_id ON public.projects(tenant_id);
CREATE INDEX idx_projects_created_by_user_id ON public.projects(created_by_user_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_start_date ON public.projects(start_date);
CREATE INDEX idx_projects_required_skills ON public.projects USING GIN (required_skills);
CREATE INDEX idx_projects_preferred_skills ON public.projects USING GIN (preferred_skills);

-- updated_at トリガー関数 (engineers.sqlで既に定義されている場合は再定義不要)
-- CREATE OR REPLACE FUNCTION trigger_set_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- updated_at トリガー
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

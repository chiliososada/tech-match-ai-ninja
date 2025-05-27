-- 技術者テーブル
CREATE TABLE public.engineers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- 技術者ID
    user_id UUID REFERENCES public.profiles(id), -- 関連ユーザーID (システムユーザーの場合)
    tenant_id UUID REFERENCES public.tenants(id), -- 所属会社ID (自社・他社技術者の区別)
    name TEXT NOT NULL, -- 氏名 (氏名は必須とする)
    email TEXT UNIQUE, -- メールアドレス (一意であるべき)
    phone TEXT, -- 電話番号
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'inactive', 'pending_review')), -- ステータス (利用可能、アサイン中、非アクティブ、レビュー待ち)
    skills JSONB, -- スキル (構造化データ)
    experience JSONB, -- 職務経歴 (構造化データ)
    education JSONB, -- 学歴 (構造化データ)
    preferences JSONB, -- 希望条件 (構造化データ)
    raw_resume_text TEXT, -- AI解析前の履歴書テキスト
    source_document_url TEXT, -- 元の履歴書ドキュメントURL (例: S3バケットのパス)
    source_details TEXT, -- 情報源詳細 (例: "resume_upload", "email_extraction")
    is_external BOOLEAN DEFAULT false, -- 外部技術者フラグ (自社管理でない場合)
    created_at TIMESTAMPTZ DEFAULT now(), -- 作成日時
    updated_at TIMESTAMPTZ DEFAULT now() -- 更新日時
);

-- コメント追加
COMMENT ON TABLE public.engineers IS '技術者テーブル';
COMMENT ON COLUMN public.engineers.id IS '技術者ID';
COMMENT ON COLUMN public.engineers.user_id IS '関連ユーザーID (システムユーザーの場合)';
COMMENT ON COLUMN public.engineers.tenant_id IS '所属会社ID (自社・他社技術者の区別)';
COMMENT ON COLUMN public.engineers.name IS '氏名 (氏名は必須とする)';
COMMENT ON COLUMN public.engineers.email IS 'メールアドレス (一意であるべき)';
COMMENT ON COLUMN public.engineers.phone IS '電話番号';
COMMENT ON COLUMN public.engineers.status IS 'ステータス (利用可能、アサイン中、非アクティブ、レビュー待ち)';
COMMENT ON COLUMN public.engineers.skills IS 'スキル (構造化データ)';
COMMENT ON COLUMN public.engineers.experience IS '職務経歴 (構造化データ)';
COMMENT ON COLUMN public.engineers.education IS '学歴 (構造化データ)';
COMMENT ON COLUMN public.engineers.preferences IS '希望条件 (構造化データ)';
COMMENT ON COLUMN public.engineers.raw_resume_text IS 'AI解析前の履歴書テキスト';
COMMENT ON COLUMN public.engineers.source_document_url IS '元の履歴書ドキュメントURL (例: S3バケットのパス)';
COMMENT ON COLUMN public.engineers.source_details IS '情報源詳細 (例: "resume_upload", "email_extraction")';
COMMENT ON COLUMN public.engineers.is_external IS '外部技術者フラグ (自社管理でない場合)';
COMMENT ON COLUMN public.engineers.created_at IS '作成日時';
COMMENT ON COLUMN public.engineers.updated_at IS '更新日時';

-- インデックス作成
CREATE INDEX idx_engineers_user_id ON public.engineers(user_id);
CREATE INDEX idx_engineers_tenant_id ON public.engineers(tenant_id);
CREATE INDEX idx_engineers_email ON public.engineers(email);
CREATE INDEX idx_engineers_status ON public.engineers(status);
CREATE INDEX idx_engineers_skills ON public.engineers USING GIN (skills);

-- updated_at トリガー関数
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at トリガー
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.engineers
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

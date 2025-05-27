-- 案件技術者マッチングテーブル
CREATE TABLE public.project_engineer_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- マッチングID
    project_id UUID NOT NULL REFERENCES public.projects(id), -- 案件ID
    engineer_id UUID NOT NULL REFERENCES public.engineers(id), -- 技術者ID
    match_score FLOAT CHECK (match_score >= 0.0 AND match_score <= 1.0), -- AIによるマッチングスコア (0.0〜1.0)
    match_type TEXT NOT NULL CHECK (match_type IN ('project_to_engineer', 'engineer_to_project', 'batch_n_to_n', 'manual_suggestion')), -- マッチングタイプ (案件から技術者へ, 技術者から案件へ, バッチn対n, 手動提案)
    status TEXT NOT NULL DEFAULT 'suggested' CHECK (status IN ('suggested', 'pending_review', 'shortlisted', 'proposed_to_company', 'proposed_to_engineer', 'accepted_by_company', 'accepted_by_engineer', 'match_confirmed', 'rejected_by_company', 'rejected_by_engineer', 'archived')), -- ステータス
    ai_match_details JSONB, -- AIマッチング詳細 (理由、使用特徴量など)
    notes TEXT, -- 手動メモ (このマッチングに関する)
    created_by_user_id UUID REFERENCES public.profiles(id), -- 作成ユーザーID (手動提案の場合など)
    created_at TIMESTAMPTZ DEFAULT now(), -- 作成日時
    updated_at TIMESTAMPTZ DEFAULT now(), -- 更新日時
    CONSTRAINT uq_project_engineer_match_type UNIQUE (project_id, engineer_id, match_type)
);

-- コメント追加
COMMENT ON TABLE public.project_engineer_matches IS '案件技術者マッチングテーブル';
COMMENT ON COLUMN public.project_engineer_matches.id IS 'マッチングID';
COMMENT ON COLUMN public.project_engineer_matches.project_id IS '案件ID';
COMMENT ON COLUMN public.project_engineer_matches.engineer_id IS '技術者ID';
COMMENT ON COLUMN public.project_engineer_matches.match_score IS 'AIによるマッチングスコア (0.0〜1.0)';
COMMENT ON COLUMN public.project_engineer_matches.match_type IS 'マッチングタイプ (案件から技術者へ, 技術者から案件へ, バッチn対n, 手動提案)';
COMMENT ON COLUMN public.project_engineer_matches.status IS 'ステータス';
COMMENT ON COLUMN public.project_engineer_matches.ai_match_details IS 'AIマッチング詳細 (理由、使用特徴量など)';
COMMENT ON COLUMN public.project_engineer_matches.notes IS '手動メモ (このマッチングに関する)';
COMMENT ON COLUMN public.project_engineer_matches.created_by_user_id IS '作成ユーザーID (手動提案の場合など)';
COMMENT ON COLUMN public.project_engineer_matches.created_at IS '作成日時';
COMMENT ON COLUMN public.project_engineer_matches.updated_at IS '更新日時';

-- インデックス作成
CREATE INDEX idx_pem_project_id ON public.project_engineer_matches(project_id);
CREATE INDEX idx_pem_engineer_id ON public.project_engineer_matches(engineer_id);
CREATE INDEX idx_pem_match_type ON public.project_engineer_matches(match_type);
CREATE INDEX idx_pem_status ON public.project_engineer_matches(status);
CREATE INDEX idx_pem_created_by_user_id ON public.project_engineer_matches(created_by_user_id);

-- updated_at トリガー (既に trigger_set_timestamp() 関数が定義されていると仮定)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.project_engineer_matches
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
